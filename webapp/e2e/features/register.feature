Feature: Registrar nuevo usuario

Scenario: intento registro
  Given página sin iniciar sesión
  When Creo un usuario
  Then Me puedo loggear