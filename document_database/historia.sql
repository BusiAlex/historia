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
  (1, 'Államalapítás', '1. Szent István Király megalapítja a magyar államot.',
  '1000', '', 1);


# Countries events inner join
select * from countries c
  inner join events e on c.id = e.countryId;

# countries by id
  select * from countries
    where id = 1;

#egy countries rekord az eventsekkel
   select c.id, c.name, c.region, e.id, e.description, e.dateFrom, e.dateTo, e.countryId from countries c
  inner join events e on c.id = e.countryId
  where c.id = 3;

#DELETE countries
delete from countries
  where id = 1;

#POST countries
  insert countries
    (name, region)
    VALUES
    ('Amerikai Egyesült Államok', 'Amerika');

#PUT countries
  UPDATE countries set
    name = 'Ausztria'
    region = 'Európa'
    where id = 1;



# DELETE
delete from events;

# Lekérdezések
select * from events;

select * from countries;