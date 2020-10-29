
create temp table __energy_test (
	trading_interval timestamp with time zone,
	generated_rooftop numeric,
	generated_gas numeric
) on commit drop;

copy __energy_test FROM '/data/23_oct_day_intervals.csv' with (FORMAT CSV, HEADER TRUE, DELIMITER ',');

select
	round(energy_sum(generated_rooftop, '1 day') * interval_size('1 day', count(generated_rooftop)), 2),
	round(energy_sum(generated_gas, '1 day') * interval_size('1 day', count(generated_gas)), 2)
from __energy_test;
