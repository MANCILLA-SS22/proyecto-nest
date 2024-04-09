import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

// "HydratedDocument" nos permitirá construir un tipo de dato UsersDocument, el cual vendrá construido por el schema de abajo, e indicando si este será mezclado con la configuración de un Documento hidratado
// o no. El documento hidratado hace referencia a que los resultados devueltos por la base sean devueltos como Instancias de documento de mongo, lo cual significa que cuenta con múltiples funcionalidades 
// adicionales de mongo. Si queremos objetos planos de JS. usamos -->   LeanDocument<User>
type UsersDocument = HydratedDocument<UserModel>; //HydratedDocument represents a hydrated Mongoose document, with methods (find, findAll, create, etc.), virtuals, and other Mongoose-specific features.

@Schema()
class UserModel{
    @Prop({required: true})
    first_name: string;

    @Prop({})
    last_name: string;

    @Prop({required: true, unique: true})
    email: string
}

const UserShema = SchemaFactory.createForClass(UserModel); //Al final del archivo, colocaremos la creación del schema final, esto a partir de una dependencia especial de Nest/mongoose llamada SchemaFactory

export {UserModel, UserShema, UsersDocument};