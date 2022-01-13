type id_hash = {id: string, hash: string};

type action =
| Record (id_hash)
| Delete (string);

type storage = big_map (string, string);

type return = (list (operation), storage);

let record = ((id_hash, storage) : (id_hash, storage)) : return => {
  let storage : big_map (string, string) = Big_map.update(id_hash.id, Some (id_hash.hash), storage);
  (([]: list (operation)), storage);
};

let delete = ((id, storage): (string, storage)) : return => {
  if (Big_map.mem(id, storage) == false) { failwith("Package-id is not known!"); };
  let storage : big_map (string, string) = Big_map.remove(id, storage);
  (([]: list (operation)), storage);
};

let main = ((action, storage) : (action, storage)) : return =>
  switch (action) {
    | Record (id_hash) => record ((id_hash, storage))
    | Delete (id)      => delete ((id, storage))
  };
