import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('userstasks', table => {
        table.increments('id').primary();
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

export async function down(knex: Knex) {
    return knex.schema.dropTable('userstasks');
}