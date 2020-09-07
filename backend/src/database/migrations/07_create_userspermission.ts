import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('userspermissions', table => {
        table.increments('id').primary();
        table.integer('usuario')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('usuarios');
        table.text('permissoes').notNullable();
    });
}

export async function down(kenx: Knex) {
    return kenx.schema.dropTable('userspermissions');
}