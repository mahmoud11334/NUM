from flask import Flask, jsonify, request
import random

app = Flask(__name__)

from flask import send_from_directory

@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)


examples = [
    "01558143429",
    "01210465470",
    "01150431951",
    "01110880539",
    "01141737957",
    "01122675246",
    "01105289737",
    "01070883943",
    "01110501025"
]


prefixes = ["010", "011", "012", "015"]


def analyze_patterns():

    positions = [[] for _ in range(8)]  
    for num in examples:
        suffix = num[3:]  
        for i, digit in enumerate(suffix):
            positions[i].append(int(digit))
    
    common_digits = []
    for pos in positions:
        if pos:
            common = max(set(pos), key=pos.count)  
            common_digits.append(common)
        else:
            common_digits.append(random.randint(0, 9))
    return common_digits

common_patterns = analyze_patterns()


def generate_smart_number():
    prefix = random.choice(prefixes)
    suffix = ""
    for i in range(8):
        if random.random() < 0.7:
            digit = common_patterns[i]
        else:
            digit = random.randint(0, 9)
        suffix += str(digit)
    return prefix + suffix

@app.route('/generate', methods=['GET'])
def generate():
    repeat = int(request.args.get('repeat', 1))
    numbers = [generate_smart_number() for _ in range(4 * repeat)]
    return jsonify({'numbers': numbers})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=10000)
