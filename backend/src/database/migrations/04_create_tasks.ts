import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('tasks', table => {
        table.increments('id').primary();
        table.string('titulo').notNullable();
        table.integer('status')
        table.date('data').notNullable();
        table.integer('group')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('groups');
        table.integer('deletado').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('tasks');
}