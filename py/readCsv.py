import csv

def read_csv(file_name):
    data = []
    file_path = f'../csv/{file_name}'

    with open(file_path, newline='') as csvfile:
        csv_reader = csv.reader(csvfile)
        
        for row in csv_reader:  # 파일 객체를 직접 사용합니다.
            data.append(row)
    
    return data

