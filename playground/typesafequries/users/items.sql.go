// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: items.sql

package users

import (
	"context"
)

const getItems = `-- name: GetItems :many
select id, name, price from items
`

func (q *Queries) GetItems(ctx context.Context, db DBTX) ([]Item, error) {
	rows, err := db.Query(ctx, getItems)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Item
	for rows.Next() {
		var i Item
		if err := rows.Scan(&i.ID, &i.Name, &i.Price); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}