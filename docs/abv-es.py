#!/usr/bin/env python3

# Este programa está diseñado para calcular la cantidad necesaria de una
# bebida alcohólica para alcanzar cierto número de
# tragos estándar de EE.UU.
# Es útil para entusiastas de los shots.
# Utiliza float y double float para máxima precisión,
# aunque el redondear está bien.

def compute_required_beverage_volume(
        abv_percent: float, num_standard_drinks: float
        ) -> float:
    """
    Calcula el volumen (en mL) de la bebida alcohólica necesaria
    para alcanzar el número deseado de bebidas estándar de EE.UU.
    ~
    Una bebida estándar de EE.UU. contiene
    aproximadamente 17.74 mL de etanol puro.
    ~
    :param abv_percent: ABV de la bebida (como porcentaje)
    :param num_standard_drinks: Número de bebidas estándar de EE.UU. deseados.
    :return: Volumen requerido de bebida en mL.
    """
    pure_ethanol_per_drink = 17.74
    total_required_ethanol = num_standard_drinks * pure_ethanol_per_drink
    required_volume = total_required_ethanol / (abv_percent / 100.0)
    return required_volume


def compute_final_abv(
        beverage_volume: float, beverage_abv: float, dilute_volume: float
        ) -> float:
    """
    Calcula el ABV final después de agregar un agente diluyente.
    ~
    :param beverage_volume: Volumen de la bebida alcohólica (mL).
    :param beverage_abv: ABV (%) de la bebida.
    :param dilute_volume: Volumen (mL) del agente diluyente.
    :return: ABV final en porcentaje.
    """
    pure_alcohol = beverage_volume * (beverage_abv / 100.0)
    total_volume = beverage_volume + dilute_volume
    final_abv = (pure_alcohol / total_volume) * 100.0
    return final_abv


def main():
    print("¡Bienvenido a la Calculadora de Shots!")

    # Entrada de la bebida en ABV(%)
    while True:
        try:
            beverage_abv = float(input(
                "Ingrese el ABV de su bebida alcohólica (en %): "
                ))
            if beverage_abv <= 0 or beverage_abv > 100:
                print("Por favor ingrese un ABV válido entre 0 y 100.")
            else:
                break
        except ValueError:
            print("Por favor ingrese un valor numérico para el ABV.")

    # Entrada de cuantas bebidas estandar (EE.UU.)
    while True:
        try:
            num_standard_drinks = float(input(
                    "(como referencia 1 bebida estándar es aproximadamente "
                    "17.74 mL de etanol puro (alcohol), "
                    "que es equivalente a 1 lata de cerveza promedio)\n"
                    "Ingrese el número de "
                    "bebidas estándar de EE.UU. que desea: "
                ))
            if num_standard_drinks <= 0:
                print(
                        "Por favor ingrese un número "
                        "positivo de bebidas estándar."
                    )
            else:
                break
        except ValueError:
            print(
                    "Por favor ingrese un valor numérico para la "
                    "cantidad de bebidas estándar."
                )

    # Calculo principal
    required_beverage_volume = compute_required_beverage_volume(
            beverage_abv, num_standard_drinks
        )

    print(
            f"\nNecesita {required_beverage_volume:.2f} mL de su bebida "
            f"para tener {num_standard_drinks} bebidas estándar de EE.UU."
          )

    # Agente diluyente opcional
    add_dilute = input(
            "\n¿Desea agregar un agente diluyente"
            " (por ejemplo, jugo de naranja)? (s/n): "
            ).strip().lower()

    if add_dilute == 's':
        while True:
            try:
                dilute_volume = float(input(
                        "Ingrese el volumen (en mL) del agente diluyente: "
                    ))
                if dilute_volume < 0:
                    print("Por favor ingrese un volumen no negativo.")
                else:
                    break
            except ValueError:
                print(
                        "Por favor ingrese un valor "
                        "numérico para el volumen del diluyente."
                    )

        total_volume = required_beverage_volume + dilute_volume
        final_abv = compute_final_abv(
                required_beverage_volume, beverage_abv, dilute_volume
            )

        print(
                f"\nDespués de agregar {dilute_volume:.2f} mL "
                f"de agente diluyente:"
              )
        print(f"  - Volumen total de la bebida: {total_volume:.2f} mL")
        print(f"  - ABV final de la bebida: {final_abv:.2f}%")

    print(
        "\nPara reducir el riesgo de daños por enfermedades o "
        "lesiones relacionadas con el alcohol, hombres y mujeres saludables "
        "no deberían beber más de 10 "
        "bebidas estándar a la semana y "
        "no más de 4 bebidas estándar en un solo día."
    )

    print(
            "\nPara más información, visite:"
            " https://www.health.gov.au/topics/alcohol/about-alcohol/"
            "how-much-alcohol-is-safe-to-drink"
        )

    print("\n¡Disfrute su bebida responsablemente!")
    print("¡No conduzca ni opere maquinaria pesada después de beber!")


if __name__ == "__main__":
    main()
