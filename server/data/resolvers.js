import {Clientes} from './db';

export const resolvers = {
    Query: {
        getClientes: (root, {limit}) => {
            return Clientes.find({}).limit(limit);
        },
        getCliente: (root, {id}) => {
            return new Promise(resolve => {
                Clientes.findById(id, (error, cliente) => {
                    if (error) rejects(error);
                    else resolve(cliente);

                });
            });
        }
    },
    Mutation: {
        crearCliente: (root, {input}) => {
            const nuevoCliente = new Clientes({
                nombre: input.nombre,
                apellido: input.apellido,
                empresa: input.empresa,
                emails: input.emails,
                edad: input.edad,
                tipo: input.tipo,
                pedidos: input.pedidos
            });
            nuevoCliente.id = nuevoCliente._id;

            return new Promise((resolve, object) => {
                nuevoCliente.save(error => {
                    if (error) rejects(error);
                    else resolve(nuevoCliente);
                });
            });
        },
        actualizarCliente: (root, {input}) => {
            return new Promise((resolve => {
                Clientes.findOneAndUpdate({_id: input.id}, input, {new: true}, (onerror, cliente) => {
                    if (onerror) rejects(onerror);
                    else resolve(cliente);
                });
            }));
        },
        eliminarCliente: (root, {id}) => {
            return new Promise((resolve => {
                Clientes.findOneAndDelete({_id: id}, onerror => {
                    if (onerror) rejects(onerror);
                    else resolve('Se eliminó correctamente');
                });
            }));
        }
    }
};