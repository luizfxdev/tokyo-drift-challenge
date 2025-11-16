package com.tokyodrift.model;

/**
 * Classe abstrata que representa um carro de corrida.
 * Implementa a interface Driftavel para capacidade de drift.
 * 
 * Esta classe demonstra os princípios de POO:
 * - Abstração: Define a estrutura base para todos os carros
 * - Encapsulamento: Atributos privados com getters/setters
 * - Herança: Serve como classe base para modelos específicos
 */
public abstract class Car implements Driftavel {
    
    // Atributos encapsulados (privados)
    private String modelo;
    private String piloto;
    private double velocidadeMaxima;

    /**
     * Construtor da classe Car
     * @param modelo Nome do modelo do carro
     * @param piloto Nome do piloto
     * @param velocidadeMaxima Velocidade máxima do carro em km/h
     */
    public Car(String modelo, String piloto, double velocidadeMaxima) {
        this.modelo = modelo;
        this.piloto = piloto;
        this.velocidadeMaxima = velocidadeMaxima;
    }

    // === GETTERS E SETTERS (Encapsulamento) ===
    
    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getPiloto() {
        return piloto;
    }

    public void setPiloto(String piloto) {
        this.piloto = piloto;
    }

    public double getVelocidadeMaxima() {
        return velocidadeMaxima;
    }

    public void setVelocidadeMaxima(double velocidadeMaxima) {
        this.velocidadeMaxima = velocidadeMaxima;
    }

    /**
     * Método abstrato para calcular o tempo de corrida
     * Cada modelo de carro implementará sua própria lógica
     * 
     * @param distancia Distância do percurso em km
     * @param velocidadeMedia Velocidade média durante a corrida em km/h
     * @param bonusDrift Bônus de tempo por drift perfeito em segundos
     * @return Tempo total da corrida em minutos
     */
    public abstract double calcularTempo(double distancia, double velocidadeMedia, double bonusDrift);
}