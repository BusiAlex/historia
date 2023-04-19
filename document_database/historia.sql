#Adatbázis létrehozása
CREATE DATABASE Historia
	CHARACTER SET utf8
	COLLATE utf8_hungarian_ci;

#Ezek csak teszt adatok
insert INTO countries
  (id, name, region)
  VALUES
  (3, 'Oroszország', 'Európa');

select * from countries;

insert into events
  (id, eventName, description, datefrom, dateTo, countryId)
  VALUES
  (4, '2. Miklós cár uralkodása', '1888-ban megkoronázzák 2. Miklós cárt, végül a kommunisták családjával együtt brutálisan kivégzik.',
 '1888', '1920', 3);


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


#GET events by id
  SELECT * from events
    where id = 1;

#GET events by country id
  select * from events
    where countryId = 1;

#DELETE events
  delete from events
    where id = 1;

 #POST events
  insert events
    (id, eventName, description, dateFrom, dateTo, countryId)
    VALUES
    (4, '2. Miklós cár uralkodása', 'Megkoronázták 2. Miklós cárt', '1888', '1920', 3);

#PUT events
  update events set
  eventName = 'lófasz',
  description = 'asd',
  dateFrom = '123',
  dateTo = '321',
  countryId = 1
  where id = 1;



# DELETE
delete from events;
delete from countries;

# Lekérdezések
select * from events;

select * from countries;