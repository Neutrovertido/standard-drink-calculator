#!/usr/bin/env python3

# This program is meant to calculate the amount of an alcoholic beverage
# needed to reach a certain number of U.S. standard drinks.
# It is useful for shot enthusiasts.
# It uses float and double float for maximum precision,
# although rounding it is okay.

def compute_required_beverage_volume(
        abv_percent: float, num_standard_drinks: float
        ) -> float:
    """
    Calculate the volume (in mL) of the alcoholic beverage needed
    to reach the desired number of U.S. standard drinks.
    ~
    One U.S. standard drink contains approximately 17.74 mL of pure ethanol.
    ~
    :param abv_percent: ABV of the beverage (as a percentage)
    :param num_standard_drinks: Number of U.S. standard drinks desired.
    :return: Required volume of beverage in mL.
    """
    pure_ethanol_per_drink = 17.74
    total_required_ethanol = num_standard_drinks * pure_ethanol_per_drink
    required_volume = total_required_ethanol / (abv_percent / 100.0)
    return required_volume


def compute_final_abv(
        beverage_volume: float, beverage_abv: float, dilute_volume: float
        ) -> float:
    """
    Calculate the final ABV after adding a dilute agent.
    ~
    :param beverage_volume: Volume of the alcoholic beverage (mL).
    :param beverage_abv: ABV (%) of the beverage.
    :param dilute_volume: Volume (mL) of the diluting agent.
    :return: Final ABV in percentage.
    """
    pure_alcohol = beverage_volume * (beverage_abv / 100.0)
    total_volume = beverage_volume + dilute_volume
    final_abv = (pure_alcohol / total_volume) * 100.0
    return final_abv


def main():
    print("Welcome to the Cocktail Calculator!")

    # Input for beverage ABV(%)
    while True:
        try:
            beverage_abv = float(input(
                "Enter the ABV of your alcoholic beverage (in %): "
                ))
            if beverage_abv <= 0 or beverage_abv > 100:
                print("Please enter a valid ABV between 0 and 100.")
            else:
                break
        except ValueError:
            print("Please enter a numeric value for ABV.")

    # Input for number of standard drinks (USA ones)
    while True:
        try:
            num_standard_drinks = float(input(
                    "(1 standard drink ~ 17.74 mL "
                    "pure ethanol, for reference 1 standard drink is about "
                    "1 can of beer worth of ethanol (alcohol)\n"
                    "Enter the number of U.S. standard drinks you want: "
                ))
            if num_standard_drinks <= 0:
                print("Please enter a positive number of standard drinks.")
            else:
                break
        except ValueError:
            print(
                    "Please enter a numeric value for the "
                    "number of standard drinks."
                )

    # Main calculation
    required_beverage_volume = compute_required_beverage_volume(
            beverage_abv, num_standard_drinks
        )

    print(
            f"\nYou need {required_beverage_volume:.2f} mL of your beverage "
            f"to have {num_standard_drinks} U.S. standard drinks."
          )

    # Optional diluting agent
    add_dilute = input(
            "\nDo you want to add a diluting agent"
            " (for example, orange juice)? (y/n): "
            ).strip().lower()

    if add_dilute == 'y':
        while True:
            try:
                dilute_volume = float(input(
                        "Enter the volume (in mL) of the diluting agent: "
                    ))
                if dilute_volume < 0:
                    print("Please enter a non-negative volume.")
                else:
                    break
            except ValueError:
                print("Please enter a numeric value for the dilute volume.")

        total_volume = required_beverage_volume + dilute_volume
        final_abv = compute_final_abv(
                required_beverage_volume, beverage_abv, dilute_volume
            )

        print(f"\nAfter adding {dilute_volume:.2f} mL of diluting agent:")
        print(f"  - Total volume of the drink: {total_volume:.2f} mL")
        print(f"  - Final ABV of the drink: {final_abv:.2f}%")

    print(
        "\nTo reduce the risk of harm from alcohol-related disease or "
        "injury, healthy men and women should drink no more than 10 "
        "standard drinks a week and no more than 4 standard drinks "
        "on any one day."
    )

    print(
            "\nFor more information please visit:"
            " https://www.health.gov.au/topics/alcohol/about-alcohol/"
            "how-much-alcohol-is-safe-to-drink"
        )

    print("\nEnjoy your drink responsibly!")


if __name__ == "__main__":
    main()
