from flask import Flask, render_template, request

app = Flask(__name__)

def calcular_salario_liquido(salario: float, dependentes: int) -> float:
    if salario < 0:
        raise ValueError("Salário não pode ser negativo.")
    if dependentes < 0:
        raise ValueError("Número de dependentes não pode ser negativo.")

    inss = salario * 0.08
    ir = salario * 0.15 if salario > 2500 else 0
    desconto_dependentes = dependentes * 200

    return salario - inss - ir + desconto_dependentes

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/resultado', methods=['POST'])
def resultado():
    try:
        salario = float(request.form['salario'].replace(',', '.'))
        dependentes = int(request.form['dependentes'])

        salario_liquido = calcular_salario_liquido(salario, dependentes)

        return render_template('resultado.html', salario_liquido=salario_liquido)

    except ValueError as e:
        return f"Erro: {str(e)}", 400
    except Exception:
        return "Erro: Insira valores numéricos válidos.", 400

if __name__ == '__main__':
    app.run(debug=True)