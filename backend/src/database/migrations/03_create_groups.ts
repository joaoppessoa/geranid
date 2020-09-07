import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('groups', table => {
        table.increments('id').primary();
        table.string('titulo').notNullable();
        table.string('cor').notNullable();
        table.integer('board')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('boards');
        table.integer('deletado').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('groups');
}