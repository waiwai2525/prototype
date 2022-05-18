use tauri::Manager;

#[derive(Clone, serde::Serialize)]
struct Coordinate {
    latitude: f64,
    longitude: f64,
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let app_handle = app.app_handle();
            let mut coordinate_offset: f64 = 0.0;
            std::thread::spawn(move || loop {
                let coordinate = Coordinate {
                    latitude: 35.0,
                    longitude: 135.0 + coordinate_offset,
                };
                coordinate_offset += 0.01;
                app_handle
                    .emit_all("update-coordinate", coordinate)
                    .unwrap();
                std::thread::sleep(std::time::Duration::from_secs(1))
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
