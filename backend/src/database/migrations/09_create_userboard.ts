import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('userboard', table => {
        table.increments('id').primary();
        table.integer('usuario')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('usuarios');
        table.integer('board')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('boards');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('userboard');
}