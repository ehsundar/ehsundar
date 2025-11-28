window.Analytics = (function() {
    const API_BASE = 'https://abacus.jasoncameron.dev';
    const NAMESPACE = 'ehsandar.ir';
    const LIKE_STORAGE_KEY = 'article-likes';
    const VIEW_STORAGE_KEY = 'article-views-tracked';

    function getPageKey(pageId, prefix = '') {
        const cleanKey = prefix + pageId.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        return cleanKey.substring(0, 64) || 'home';
    }

    function getUserLikes() {
        try {
            return JSON.parse(localStorage.getItem(LIKE_STORAGE_KEY) || '{}');
        } catch (e) {
            return {};
        }
    }

    function setUserLiked(pageId, liked) {
        try {
            const likes = getUserLikes();
            likes[pageId] = liked;
            localStorage.setItem(LIKE_STORAGE_KEY, JSON.stringify(likes));
        } catch (e) {
            console.error('Failed to save like state:', e);
        }
    }

    function hasViewBeenCounted(pageId) {
        try {
            const tracked = JSON.parse(sessionStorage.getItem(VIEW_STORAGE_KEY) || '{}');
            return tracked[pageId] || false;
        } catch (e) {
            return false;
        }
    }

    function markViewAsCounted(pageId) {
        try {
            const tracked = JSON.parse(sessionStorage.getItem(VIEW_STORAGE_KEY) || '{}');
            tracked[pageId] = true;
            sessionStorage.setItem(VIEW_STORAGE_KEY, JSON.stringify(tracked));
        } catch (e) {
            console.error('Failed to mark view as counted:', e);
        }
    }

    async function fetchCount(pageKey) {
        try {
            const response = await fetch(`${API_BASE}/get/${NAMESPACE}/${pageKey}`);
            const data = await response.json();
            return data.value || 0;
        } catch (e) {
            console.error('Failed to fetch count:', e);
            return 0;
        }
    }

    async function incrementCount(pageKey) {
        try {
            const response = await fetch(`${API_BASE}/hit/${NAMESPACE}/${pageKey}`);
            const data = await response.json();
            return data.value || 0;
        } catch (e) {
            console.error('Failed to increment count:', e);
            return null;
        }
    }

    async function loadViews(pageId, countElement) {
        const viewKey = getPageKey(pageId, 'views-');
        const hasBeenCounted = hasViewBeenCounted(pageId);

        if (!hasBeenCounted) {
            const viewCount = await incrementCount(viewKey);
            if (viewCount !== null) {
                countElement.textContent = viewCount + (viewCount === 1 ? ' view' : ' views');
                markViewAsCounted(pageId);
            } else {
                const fallbackCount = await fetchCount(viewKey);
                countElement.textContent = fallbackCount + (fallbackCount === 1 ? ' view' : ' views');
            }
        } else {
            const viewCount = await fetchCount(viewKey);
            countElement.textContent = viewCount + (viewCount === 1 ? ' view' : ' views');
        }
    }

    async function loadLikes(pageId, countElement) {
        const likeKey = getPageKey(pageId);
        const likeCount = await fetchCount(likeKey);
        countElement.textContent = likeCount + (likeCount === 1 ? ' like' : ' likes');
        return likeCount;
    }

    async function toggleLike(pageId, button, countElement, options = {}) {
        if (button.disabled) return;

        const { activeClass = 'active', likedElement = null, onLike = null } = options;

        button.disabled = true;
        const likeKey = getPageKey(pageId);
        const wasLiked = getUserLikes()[pageId] || false;

        if (!wasLiked) {
            setUserLiked(pageId, true);

            const newCount = await incrementCount(likeKey);
            const countText = newCount !== null
                ? newCount + (newCount === 1 ? ' like' : ' likes')
                : (parseInt(countElement.textContent) + 1) + ' likes';

            if (likedElement) {
                const likedCountSpan = likedElement.querySelector('.count') || likedElement.querySelector('.like-count');
                if (likedCountSpan) {
                    likedCountSpan.textContent = countText;
                }
                button.style.display = 'none';
                likedElement.style.display = button.style.display === 'none' ?
                    (likedElement.classList.contains('inline-item') ? 'inline-flex' : 'flex') : 'flex';
            } else {
                button.classList.add(activeClass);
                countElement.textContent = countText;
            }

            button.setAttribute('aria-pressed', 'true');

            window.dispatchEvent(new CustomEvent('likeChanged', {
                detail: { pageId, liked: true, count: countText }
            }));

            if (onLike) onLike(countText);
        } else {
            button.classList.remove(activeClass);
            setUserLiked(pageId, false);

            const text = countElement.textContent.trim();
            const currentCount = parseInt(text) || 0;
            const updatedCount = Math.max(0, currentCount - 1);
            const countText = updatedCount + (updatedCount === 1 ? ' like' : ' likes');
            countElement.textContent = countText;

            button.setAttribute('aria-pressed', 'false');

            window.dispatchEvent(new CustomEvent('likeChanged', {
                detail: { pageId, liked: false, count: countText }
            }));
        }

        button.disabled = false;
    }

    function isUserLiked(pageId) {
        return getUserLikes()[pageId] || false;
    }

    return {
        loadViews,
        loadLikes,
        toggleLike,
        isUserLiked
    };
})();
