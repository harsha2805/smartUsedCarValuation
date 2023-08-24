from flask import Flask, render_template, jsonify, request
import numpy as np
import pickle

app = Flask(__name__)
model = pickle.load(open('F:/file11_final/file11/Forest_model.pkl', 'rb'))

@app.route("/")
def hello():
    return render_template("index.html")

@app.route("/predict", methods=['POST'])
def predict():
    inp_fea = list(request.form.values())
    if inp_fea[3] == 'petrol':
        inp_fea[3] = 0
    elif inp_fea[3] == 'diesel':
        inp_fea[3] = 1
    else:
        inp_fea[3] = 2

    if inp_fea[4] == 'dealer':
        inp_fea[4] = 0
    else:
        inp_fea[4] = 1

    if inp_fea[5] == 'manual':
        inp_fea[5] = 0
    else:
        inp_fea[5] = 1

    inp_fea = np.asarray(inp_fea)
    inp_fea = inp_fea.reshape(1, -1)
    inp_fea = list(inp_fea)

    prediction = model.predict(inp_fea)
    output = round(prediction[0], 2)

    return jsonify({'prediction': output})


if __name__ == "__main__":
    app.run(debug=True)


# For displaying the user input
    # inp_fea = np.asarray(inp_fea)
    # inp_fea = ",".join(inp_fea)
    # inp_fea = list(inp_fea)
    # final_fea = [np.array(inp_fea)]
    # return render_template('index.html',prediction_text = "{}".format(inp_fea))
    #to display directly in the page without using JSON
    # return render_template('index.html', prediction_text="The price of this car should be INR {} Lakhs".format(output))