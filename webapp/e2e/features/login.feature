Feature: Loguearse en la aplicación

Scenario: Usuario inicia sesión
  Given Página sin usuario logueado
  When Proceso de login
  Then Se muestra su perfil