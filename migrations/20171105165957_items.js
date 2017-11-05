exports.up = function(knex, Promise) {
    return knex.schema.createTable('items', (table) => {
        table.increments('item_id').primary();
        table.text('itemname').unique().notNull();
        table.text('itemtype');
        table.integer('owner');
        table.integer('renter');
        table.float('price');
        table.text('picture');
        table.float('longitude');
        table.float('latitude');
        table.text('comment');
        table.text('info'); 
        table.text('renter_name');
        table.text('owner_name');

 });
 
 
 }
 exports.down = function(knex, Promise) {
    return knex.schema.dropTable('items');
 };
 
