/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('forty_five_day_cache', function(table){

        table.string('bouy_id')
        table.date('record_date')
        table.time('record_time')
        table.string('WDIR')
        table.string('WSPD')
        table.string('GST')
        table.string('WVHT')
        table.string('DPD')
        table.string('APD')
        table.string('MWD') 
        table.string('PRES')
        
        table.unique(['bouy_id', 'record_date', 'record_time'])
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.dropTableIfExists('forty_five_day_cache')
};
