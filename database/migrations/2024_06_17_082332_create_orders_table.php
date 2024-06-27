<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('customerName')->nullable();
            $table->string('customerAddress')->nullable();
            $table->string('customerMobile')->nullable();
            $table->double('finalAmount');
            $table->double('totalAmount');
            $table->double('paidAmount');
            $table->double('discount');
            $table->integer('paymentType')->nullable();
            $table->integer('invoiceType')->nullable();
            $table->integer('orderStatus')->nullable();
            $table->date('deliveryDate')->nullable();
            $table->date('invoiceDate')->nullable();
            $table->boolean('show')->default(true);
            $table->timestamps();
        });

        Schema::create('order_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('product_sizes_id');
            $table->string('product_name')->nullable();
            $table->string('product_unit')->nullable();
            $table->string('product_local_name')->nullable();
            $table->string('size_name')->nullable();
            $table->string('size_local_name')->nullable();
            $table->integer('qty');
            $table->double('oPrice');
            $table->double('dPrice');
            $table->double('total_price');
            $table->timestamps();
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_details');
        Schema::dropIfExists('orders');
    }
};
