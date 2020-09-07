import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('comments', table => {
        table.increments('id').primary();
        table.text('texto').notNullable();
        table.integer('usuario')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('usuarios');
        table.integer('task')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('tasks');
        table.integer('deletado').notNullable();
    });
}

export async function down(kenx: Knex) {
    return kenx.schema.dropTable('comments');
}