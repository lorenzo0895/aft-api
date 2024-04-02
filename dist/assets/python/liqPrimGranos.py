import os
import tabula
import pandas as pd
import re
import sys
import math


def extract():
    src = os.path.normpath(__file__ + '../../')
    pdf_paths = [os.path.normpath(src + '/' + item) for item in sys.argv[1:]]

    array = []
    for pdf in pdf_paths:
        tables = tabula.read_pdf(pdf, pages='all')
        array.append(process_table(tables))
    print(array)

def process_table(tables: pd.DataFrame):
    obj = {
        "deducciones": [],
        "retenciones": [],
    }
    for df in tables:
        if(df.columns[0] == "CONDICIONES DE LA OPERACIÓN"):
            obj["condiciones"] = conditions(df)
        elif(df.columns[0] == "MERCADERIA ENTREGADA"):
            obj["entregado"] = delivery(df)
        elif(df.columns[0] == "OPERACIÓN"):
            obj["operacion"] =  operation(df)
        elif(df.columns[0] == "DEDUCCIONES"):
            obj["deducciones"] = deductions(df)
        elif(df.columns[0] == "RETENCIONES"):
            obj["retenciones"] = withholdings(df)
    return obj


def conditions(df: pd.DataFrame):
    texto = df.iloc[1][0]
    precio = re.search(r"\d+", texto).group()
    grado = re.search(r"\d+\s+(\w+)\s+\d+\s+-", texto).group(1)
    grano = re.search(r"\d+\s+-\s+(\w+)", texto).group()
    obj = {"precio": precio, "grado": grado, "grano": grano}
    return obj

def delivery(df: pd.DataFrame):
    array = []
    for i, row in enumerate(df.iloc):
        if i == 0:
            continue
        array.append({
            "comprobante": re.search(r"(\w+)\s", row[0]).group(0).strip(),
            "grado": re.search(r"\s(\w+)", row[0]).group(1),
            "factor": get_string(row[1]),
            "proteina": get_string(row[2]),
            "peso": get_string(row[3]),
            "procedencia": row[4]
        })
    return array

def operation(df: pd.DataFrame):
    return {
        "cantidad": get_string(df.iloc[1][0]),
        "precio": get_string(df.iloc[1][1]),
        "subtotal": get_string(df.iloc[1][2]),
        "alicuota": get_string(df.iloc[1][3]),
        "iva": get_string(df.iloc[1][4]),
        "total": get_string(df.iloc[1][4]),
    }

def deductions(df: pd.DataFrame):
    # print("DEDUCCIONES")
    # print(df.iloc[1])
    # print(df.iloc[2])
    return []

def withholdings(df: pd.DataFrame):
    # print("RETENCIONES")
    # print(df.iloc[5])
    return []

def get_string(a):
    try:
        return '' if math.isnan(float(a)) else a
    except:
        return str(a)

extract()