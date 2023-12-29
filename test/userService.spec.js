const { usuarioExiste, emailExiste } = require('../services/userService');

const { testeDB } = require('../config/database');

describe('Testando função emailExiste de userService', () => {
    it('deve retornar FALSE para email invalido', () => {
        const email = 'invalido@mail.com';
        expect(emailExiste(email, testeDB)).toBe(false);
    });
    it('deve retornar FALSE para email inexistente', () => {
        const email = undefined;
        expect(emailExiste(email, testeDB)).toBe(false);
    });

    it('deve retornar FALSE para email vazio', () => {
        const email = '';
        expect(emailExiste(email, testeDB)).toBe(false);
    });

    it('deve retornar TRUE para email valido', () => {
        const email = 'valido@mail.com';
        expect(emailExiste(email, testeDB)).toBe(true);
    });
});


describe('Testando função usuarioExiste de userService', () => {
    it('deve retornar FALSE para email inexistente', () => {
        const email = undefined;
        const senha = 123456;
        expect(usuarioExiste(email, senha, testeDB)).toBe(false);
    });

    it('deve retornar FALSE para email invalido', () => {
        const email = 'invalido@mail.com';
        const senha = 123456;
        expect(usuarioExiste(email, senha, testeDB)).toBe(false);
    });
    it('deve retornar TRUE para email valido', () => {
        const email = 'valido@mail.com';
        const senha = 123456;
        expect(usuarioExiste(email, senha, testeDB)).toBe(true);
    });

    it('deve retornar FALSE para senha inexistente', () => {
        const email = 'valido@mail.com';
        const senha = undefined;
        expect(usuarioExiste(email, senha, testeDB)).toBe(false);
    });

    it('deve retornar FALSE para senha invalida', () => {
        const email = 'valido@mail.com';
        const senha = 'senha_invalida';
        expect(usuarioExiste(email, senha, testeDB)).toBe(false);
    });

    it('deve retornar TRUE para senha valida', () => {
        const email = 'valido@mail.com';
        const senha = 123456;
        expect(usuarioExiste(email, senha, testeDB)).toBe(true);
    });

    it('deve executar em menos de 1 milissegundo para um email existente', () => {
        const email = 'valido@mail.com';
        const senha = 123456;

        const start = Date.now();
        usuarioExiste(email, senha, testeDB);
        const end = Date.now();

        expect(end - start).toBeLessThan(1);
    });

});