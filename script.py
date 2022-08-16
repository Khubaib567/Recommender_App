from recommender_sys import recommender_system
import sys
import pickle


def main():
    # load saved model
    with open('model_pickle', 'rb') as f:
        model = pickle.load(f)
# Here we will store the output for giving the recommendations
    output_label = model.predict([[sys.argv[1]]])
    output_label = float(output_label)
    output_label = round(output_label)
    print(recommender_system(output_label))


if __name__ == '__main__':
    main()
