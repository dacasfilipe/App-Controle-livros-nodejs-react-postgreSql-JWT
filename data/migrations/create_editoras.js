exports.up = function(knex) {
    return knex.schema.createTable('editoras', (table) => {
      table.increments('id').primary();
      table.string('nome', 80).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('editoras');
  };
  