Feature: Logout de la aplicación

Scenario: Usuario se desloguea de la aplicación
  Given Página con usuario logueado
  When Proceso de logout
  Then Se muestra el botón iniciar sesión