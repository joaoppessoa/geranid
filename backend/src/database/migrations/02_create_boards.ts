import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('boards', table => {
        table.increments('id').primary();
        table.string('titulo').notNullable();
        table.text('descricao');
        table.integer('usuario')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('usuarios');
        table.integer('workspace')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('workspaces');
        table.integer('deletado').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('boards');
}