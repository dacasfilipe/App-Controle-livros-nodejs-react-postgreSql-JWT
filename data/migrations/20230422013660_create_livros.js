exports.up = function(knex) {
    return knex.schema.createTable('livros', (table) => {
      table.increments('id').primary();
      table.string('titulo', 80).notNullable();
      table.integer('autor_id').unsigned().notNullable();
      table.integer('editora_id').unsigned().notNullable();
      table.integer('ano', 4).notNullable();
      table.decimal('preco', 10, 2).notNullable();
      table.string('foto', 100).notNullable();
  
      table.foreign('autor_id').references('id').inTable('autores');
      table.foreign('editora_id').references('id').inTable('editoras');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('livros');
  };
  