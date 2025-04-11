


Table colony {
  id int pk
  title varchar
  
}

Table govenor {
  id int pk
  name varchar
  colonyId int
  status boolean
}

Table facility {
  id int pk
  title varchar
  status boolean
}

Table facilityMineral {
  id int pk
  mineralId int
  miningFacilityId int
}

Table mineral {
  id int pk
  title varchar

}

Table colonyMineral {
  id int pk
  quantity int
  mineralId int
  colonyId int
}




Ref: "colony"."id" < "govenor"."colonyId"

Ref: "facilityMineral"."miningFacilityId" > "facility"."id"

Ref: "facilityMineral"."mineralId" > "mineral"."id"

Ref: "mineral"."id" < "colonyMineral"."mineralId"

Ref: "colony"."id" < "colonyMineral"."colonyId"