import React, {Component, Fragment} from 'react';
import {NUEVO_CLIENTE} from '../mutation';
import {Mutation} from 'react-apollo';

class NuevoCliente extends Component {
    state = {
        cliente: {
            nombre: '',
            apellido: '',
            empresa: '',
            edad: '',
            tipo: ''
        },
        error: false,
        emails: []
    };

    nuevoCampo = () => {
        this.setState({
            emails: this.state.emails.concat([{
                email: ''
            }])
        });
    };

    removeInput = i => () => {
        this.setState({
            emails: this.state.emails.filter((email, index) => i !== index)
        });
    };

    leerCampo = i => e => {
        const nuevoMail = this.state.emails.map((email, index) => {
            if (i !== index) return email;
            return {
                ...email,
                email: e.target.value
            };
        });
        this.setState({
            emails: nuevoMail
        });
    };

    render() {
        const {error} = this.state;
        let respuesta = (error) ?
            <p className="alert alert-danger p-3 text-center"> Todos los campos son obligatorios</p> : '';
        return (
            <Fragment>
                <h2 className="text-center">Nuevo Cliente</h2>
                {respuesta}
                <div className="row justify-content-center">
                    <Mutation
                        mutation={NUEVO_CLIENTE}
                        onCompleted={() => {
                            this.props.history.push('/');
                        }}
                    >
                        {crearCliente => (
                            <form className="col-8 m-3" onSubmit={event => {
                                event.preventDefault();
                                const {nombre, apellido, empresa, edad, tipo} = this.state.cliente;
                                const {emails} = this.state;
                                if (nombre === '' || apellido === '' || empresa === '' || edad === '' || tipo === '') {
                                    this.setState({
                                        error: true
                                    });
                                    return;
                                }
                                this.setState({
                                    error: false
                                });
                                const input = {
                                    nombre,
                                    apellido,
                                    emails,
                                    empresa,
                                    edad: Number(edad),
                                    tipo
                                };
                                crearCliente({
                                    variables: {input}
                                });
                            }}>
                                <div className="form-row">
                                    <div className="form-group col-6">
                                        <label htmlFor="userName">Nombre</label>
                                        <input
                                            onChange={event => {
                                                this.setState({
                                                    cliente: {
                                                        ...this.state.cliente,
                                                        nombre: event.target.value
                                                    }
                                                });
                                            }}
                                            type="text" className="form-control" placeholder="Nombre" id="userName"/>
                                    </div>
                                    <div className="form-group col-6">
                                        <label htmlFor="userLastName">Apellido</label>
                                        <input
                                            onChange={event => {
                                                this.setState({
                                                    cliente: {
                                                        ...this.state.cliente,
                                                        apellido: event.target.value
                                                    }
                                                });
                                            }}
                                            type="text"
                                            className="form-control"
                                            placeholder="Apellido"
                                            id="userLastName"/>
                                    </div>
                                    <div className="form-group col-12">
                                        <label htmlFor="userEmpresa">Empresa</label>
                                        <input
                                            onChange={event => {
                                                this.setState({
                                                    cliente: {
                                                        ...this.state.cliente,
                                                        empresa: event.target.value
                                                    }
                                                });
                                            }}
                                            type="text" className="form-control" placeholder="Empresa"
                                            id="userEmpresa"/>
                                    </div>
                                    {this.state.emails.map((input, index) => (
                                        <div key={index} className="form-group col-12">
                                            <label htmlFor={index + 'userMail'}>Correo {index + 1}</label>
                                            <div className="input-group">
                                                <input onChange={this.leerCampo(index)} type="email"
                                                       id={index + 'userMail'}
                                                       placeholder="Email" className="form-control"/>
                                                <div className="input-group-append">
                                                    <button type="button" className="btn btn-danger"
                                                            onClick={this.removeInput(index)}>&times; Eliminar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="form-group d-flex justify-content-center col-12">
                                        <button
                                            onClick={this.nuevoCampo}
                                            type="button"
                                            className="btn btn-warning">
                                            + Agregar Mail
                                        </button>
                                    </div>
                                    <div className="form-group col-6">
                                        <label htmlFor="userAge">Edad</label>
                                        <input
                                            onChange={event => {
                                                this.setState({
                                                    cliente: {
                                                        ...this.state.cliente,
                                                        edad: event.target.value
                                                    }
                                                });
                                            }}
                                            type="text" className="form-control" placeholder="Edad" id="userAge"/>
                                    </div>
                                    <div className="form-group col-6">
                                        <label htmlFor="userType">Tipo Cliente</label>
                                        <select onChange={event => {
                                            this.setState({
                                                cliente: {
                                                    ...this.state.cliente,
                                                    tipo: event.target.value
                                                }
                                            });
                                        }} className="form-control" id="userType">
                                            <option value="">Elegir...</option>
                                            <option value="PREMIUM">PREMIUM</option>
                                            <option value="BASICO">BÁSICO</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success btn-block">Enviar</button>
                            </form>
                        )}
                    </Mutation>
                </div>
            </Fragment>
        );
    }
}

export default NuevoCliente;