//Colocaremos la entidad usuario, para poder utilizarla en las múltiples operaciones. 
//Consistirá en una clase que podremos tomar como modelo de datos principal para los movimientos que realicemos con nuestras fuentes de datos.
//(Esto porque es importante especificar un tipo de dato para Typescript, entonces así contaremos con el tipo de dato “User”.

class User {
    id: Number;
    first_name: String;
    last_name: String;
    email: String;
    password: String;
    avatar: String;
}

export {User};