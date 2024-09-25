<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('multiforms', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('company_id')->nullable();   // Company ID (nullable)
            $table->string('user_type')->nullable();    // User type (nullable)
            $table->string('form_type')->nullable();    // Form type (nullable)
            $table->string('first_name')->nullable();   // First name (nullable)
            $table->string('last_name')->nullable();    // Last name (nullable)
            $table->string('email')->nullable();        // Email (nullable)
            $table->string('contact')->nullable();      // Contact (nullable)
            $table->string('address')->nullable();      // Address (nullable)
            $table->string('querry')->nullable();       // Query/message (nullable)

            // Additional 10 fields, all nullable
            $table->string('field_1')->nullable();
            $table->string('field_2')->nullable();
            $table->string('field_3')->nullable();
            $table->string('field_4')->nullable();
            $table->string('field_5')->nullable();
            $table->string('field_6')->nullable();
            $table->string('field_7')->nullable();
            $table->string('field_8')->nullable();
            $table->string('field_9')->nullable();
            $table->string('field_10')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('multiforms');
    }
};
