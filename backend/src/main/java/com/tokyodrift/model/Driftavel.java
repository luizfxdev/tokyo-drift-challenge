package com.tokyodrift.model;

/**
 * Interface que define o comportamento de drift
 * 
 * Interfaces em Java:
 * - Definem contratos (métodos que devem ser implementados)
 * - Permitem polimorfismo
 * - Não possuem implementação (apenas assinatura dos métodos)
 * 
 * Esta interface garante que todos os carros possam realizar drift
 */
public interface Driftavel {
    /**
     * Método que retorna o bônus de drift do veículo
     * Cada modelo implementa seu próprio valor
     * 
     * @return Valor em segundos do bônus de drift
     */
    double realizarDrift();

    /**
     * Método que retorna a descrição do tipo de drift
     * 
     * @return String descrevendo as características do drift
     */
    String getTipoDrift();
}
