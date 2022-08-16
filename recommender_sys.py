import pandas as pd
import numpy as np


dataset_csv = "Suggestion.csv"
dataset_df = pd.read_csv(dataset_csv, index_col=None)


def recommender_system(y):

    # Here output has 0 label, then it has minimal depression and anxiety.
    if y == 0:
        return dataset_df['Suggestions'][0]

    # Here output has 1 label, then it has mild depression and anxiety.
    elif y == 1:
        return dataset_df['Suggestions'][4]

    # Here output has 2 label, then it has moderate severe depression and anxiety.
    elif y == 2:
        return dataset_df['Suggestions'][9]

    # Here output has 3 label, then it has severe depression and anxiety.
    elif y == 3:
        return dataset_df['Suggestions'][14]

    elif y == 4:
        return dataset_df['Suggestions'][19]
