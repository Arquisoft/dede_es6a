Feature: Añadir producto al carrito 

Scenario: Usuario añade producto
  Given Usuario logueado
  When Añade producto al carrito
  Then Aparece en el carrito