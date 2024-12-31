package com.licorera3jjjs.app;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        // Verifica si el Intent tiene datos adicionales
        Intent intent = getIntent();
        if (intent != null && intent.getExtras() != null) {
            handleIntent(intent);
        } else {
            // Si no hay datos, muestra el splash y redirige después de unos segundos
            new Handler().postDelayed(() -> {
                Intent mainIntent = new Intent(SplashActivity.this, MainActivity.class);
                startActivity(mainIntent);
                finish();
            }, 3000); // 3 segundos
        }
    }

    private void handleIntent(Intent intent) {
        // Aquí maneja los datos del Intent si existen
        Bundle extras = intent.getExtras();
        if (extras != null) {
            // Puedes usar los datos del Intent aquí si son necesarios
            Intent mainIntent = new Intent(this, MainActivity.class);
            mainIntent.putExtras(extras); // Pasa los datos al MainActivity
            startActivity(mainIntent);
        } else {
            // Si no hay datos, redirige al MainActivity
            Intent mainIntent = new Intent(this, MainActivity.class);
            startActivity(mainIntent);
        }
        finish(); // Cierra el SplashActivity
    }
}
