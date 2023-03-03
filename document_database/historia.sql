#Adatbázis létrehozása
CREATE DATABASE Historia
	CHARACTER SET utf8
	COLLATE utf8_hungarian_ci;

#Ezek csak teszt adatok
insert INTO countries
  (id, name, region)
  VALUES
  (1, 'Magyarország', 'Európa');

select * from countries;

insert into events
  (id, eventName, description, dateFrom, dateTo, countryId)
  VALUES
  (1, 'Államalapítás', 'A magyar államalapítás napja az a nap volt, amikor István királyunkat megkoronázták.',
  '1000', '', 1);

delete from events;

select * from events;