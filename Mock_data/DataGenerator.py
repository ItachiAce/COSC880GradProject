import random
import time
# import psycopg2

def generate_random_blood_pressure():
    return random.randint(80, 120), random.randint(50, 80)

def generate_random_heart_rate():
    return random.randint(60, 100)

def generate_random_temperature():
    return round(random.uniform(36.0, 37.5), 2)

def generate_random_spo2():
    return random.randint(90, 100)

def generate_random_patient_id():
    return random.randint(1, 10)

def record_vitals(conn):
    systolic, diastolic = generate_random_blood_pressure()
    heart_rate = generate_random_heart_rate()
    temperature = generate_random_temperature()
    spo2 = generate_random_spo2()
    patient_id = generate_random_patient_id()
    timestamp = time.strftime('%Y-%m-%d %H:%M:%S')

    # Insert data into the 'vitals' table
    cursor = conn.cursor()
    cursor.execute('INSERT INTO vitals (patient_id, timestamp, systolic, diastolic, heart_rate, temperature, spo2) VALUES (%s, %s, %s, %s, %s, %s, %s)',
                   (patient_id, timestamp, systolic, diastolic, heart_rate, temperature, spo2))
    conn.commit()
    cursor.close()

    print(f'Timestamp: {timestamp}, Patient ID: {patient_id}, Systolic: {systolic}, Diastolic: {diastolic}, Heart Rate: {heart_rate}, Temperature: {temperature}, SpO2: {spo2}')

if __name__ == '__main__':
    try:
        # Replace the following line with your actual Railway PostgreSQL connection string
        connection = psycopg2.connect(
            "postgresql://postgres:railway"
        )

        while True:
            record_vitals(connection)
            time.sleep(60)  # Record every 60 seconds

    except KeyboardInterrupt:
        print('Recording stopped by user')
    finally:
        if connection:
            connection.close()
