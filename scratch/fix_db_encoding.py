import mysql.connector

try:
    conn = mysql.connector.connect(
        host="localhost",
        port=3307,
        user="root",
        password="thang123!",
        database="atelier_management",
        charset='utf8mb4'
    )
    cursor = conn.cursor()

    # Danh sách các tên chuẩn muốn cập nhật
    # Ở đây tôi sẽ cập nhật chung cho 12 sản phẩm mới nhất để đảm bảo sạch sẽ
    new_name = "Áo sơ mi nam công sở Safetino"
    
    # Lấy ID của 12 sản phẩm cuối cùng
    cursor.execute("SELECT product_id FROM products ORDER BY product_id DESC LIMIT 12")
    ids = [row[0] for row in cursor.fetchall()]
    
    for pid in ids:
        cursor.execute(
            "UPDATE products SET product_name = %s WHERE product_id = %s",
            (new_name, pid)
        )
    
    conn.commit()
    print(f"Successfully updated {len(ids)} products with correct Vietnamese names.")

except Exception as e:
    print(f"Error: {e}")
finally:
    if 'conn' in locals() and conn.is_connected():
        cursor.close()
        conn.close()
