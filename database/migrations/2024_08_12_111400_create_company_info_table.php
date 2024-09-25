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
        Schema::create('company_info', function (Blueprint $table) {
            $table->string('company_id')->primary(); // No autoIncrement
            $table->string('company_name')->unique()->nullable();
            $table->string('block_status')->nullable();
            $table->string('logo')->nullable();
            $table->string('sign')->nullable();
            $table->string('land_mark')->nullable();
            $table->string('Tal')->nullable();
            $table->string('Dist')->nullable();
            $table->string('pincode')->nullable();
            $table->string('contact')->nullable(); // Replaced phone_no with contact
            $table->string('field_1')->nullable(); // Replaced bank_name with field_1
            $table->string('field_2')->nullable(); // Replaced account_no with field_2
            $table->string('field_3')->nullable(); // Replaced IFSC_code with field_3

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_info');
    }
};
