(function() {
    const API_BASE = 'https://abacus.jasoncameron.dev';
    const NAMESPACE = 'ehsandar.ir';
    const VIEW_STORAGE_KEY = 'page-views-tracked';

    function getPageKey(pageId) {
        const cleanKey = 'views-' + pageId.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        return cleanKey.substring(0, 64) || 'views-home';
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

    async function incrementView(pageKey) {
        try {
            const response = await fetch(`${API_BASE}/hit/${NAMESPACE}/${pageKey}`);
            const data = await response.json();
            return data.value || 0;
        } catch (e) {
            return null;
        }
    }

    async function fetchViewCount(pageKey) {
        try {
            const response = await fetch(`${API_BASE}/get/${NAMESPACE}/${pageKey}`);
            const data = await response.json();
            return data.value || 0;
        } catch (e) {
            return 0;
        }
    }

    async function trackPageView(pageId) {
        const pageKey = getPageKey(pageId);
        const hasBeenCounted = hasViewBeenCounted(pageId);

        if (!hasBeenCounted) {
            const count = await incrementView(pageKey);
            if (count !== null) {
                console.log(`📊 Page views for '${pageId}':`, count);
                markViewAsCounted(pageId);
            } else {
                const fallbackCount = await fetchViewCount(pageKey);
                console.log(`📊 Page views for '${pageId}':`, fallbackCount);
            }
        } else {
            const count = await fetchViewCount(pageKey);
            console.log(`📊 Page views for '${pageId}':`, count, '(already counted this session)');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            const pageId = window.location.pathname || '/';
            trackPageView(pageId);
        });
    } else {
        const pageId = window.location.pathname || '/';
        trackPageView(pageId);
    }
})();
