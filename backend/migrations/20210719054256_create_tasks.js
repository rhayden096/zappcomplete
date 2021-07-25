exports.up = function(knex, Promise) {
    return knex.schema.createTable('tasks', function(table) {
      table.increments('id');
      table.string('title').notNullable();
      table.string('description').notNullable();
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tasks');
  }
