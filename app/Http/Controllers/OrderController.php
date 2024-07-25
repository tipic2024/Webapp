<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\ProductSize;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // $orders = Order::all();
        $invoiceType = $request->query('invoiceType');
        if($invoiceType > -1){
            $orders = Order::where('invoiceType',$invoiceType)->orderBy('id', 'desc')->paginate(25);
            return $orders;
        }else{
            $orders = Order::orderBy('id', 'desc')->paginate(25);
            return $orders;
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Create order
        $order = Order::create($request->all());
        // Insert all items in Order details
        foreach($request->items as $item){
            $od = new OrderDetail;
            $od->product_id = $item['product_id'];
            $od->product_name = $item['product_name'];
            $od->product_local_name = $item['product_local_name'];
            $od->product_unit = $item['product_unit'];
            $od->product_sizes_id = $item['product_sizes_id'];
            $od->size_name = $item['size_name'];
            $od->size_local_name = $item['size_local_name'];
            $od->qty = $item['qty'];
            $od->oPrice = $item['oPrice'];
            $od->dPrice = $item['dPrice'];
            $od->total_price = $item['qty'] * $item['oPrice'];
            $order->items()->save($od);
            //update quantity of products
            if($request->invoiceType == "1"){
                $productSize = ProductSize::find($item['product_sizes_id']);
                $productSize->update(['qty'=> $productSize->qty - $item['qty']]);
            }
        }
        
        $order->items = $order->items()->get();
        return $order;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $order = Order::find($id);
        $order->items = $order->items()->get();
        return $order;
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $order = Order::find($id);
        //Delivered product is being marked as canceled
        if($order->orderStatus == "1" && $request->orderStatus == "0"){
            $order->items = $order->items()->get();
            foreach($order->items as $item){
                $productSize = ProductSize::find($item['product_sizes_id']);
                $productSize->update(['qty'=> $productSize->qty + $item['qty']]);
            }
        }
        //Booking is being marked as delivered
        if($request->invoiceType == "2" && $request->orderStatus == "1"){
            $order->items = $order->items()->get();
            foreach($order->items as $item){
                $productSize = ProductSize::find($item['product_sizes_id']);
                $productSize->update(['qty'=> $productSize->qty - $item['qty']]);
            }
        }
        $order = Order::find($id);
        $order->update($request->all());
        return $order;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Order::destroy($id);
    }

    public function Sales(Request $request)
    {
        $startDate = $request->query('startDate');
        $endDate = $request->query('endDate');
        
        $query = Order::whereNotIn('orderStatus', [0, 2])
                       ->where('orderStatus',1) ;// Initial filter for orderStatus = 1
        
        if ($startDate && $endDate) {
            $query->whereBetween('invoiceDate', [$startDate, $endDate]);
        }
        
        $result = $query->get()->filter(function ($order) {
            return $order->orderStatus == 1; // Filter out any order with orderStatus other than 1
        });
        
        return response()->json($result);
    }


    public function TotalDeliverie(Request $request)
    {
        $startDate = $request->query('startDate');
        $endDate = $request->query('endDate');
        
        $query = Order::whereNotIn('orderStatus', [0, 1])
                       ->where('orderStatus',2) // Initial filter for orderStatus = 2 => Pending delivery
                       ->where('invoiceType',2) ;// Initial filter for invoicetype = 2 => advance booking
        
        if ($startDate && $endDate) {
            $query->whereBetween('deliveryDate', [$startDate, $endDate]);
        }
        
        $result = $query->get()->filter(function ($order) {
            return $order->orderStatus == 2; // Filter out any order with orderStatus other than 1
        });
        
        return response()->json($result);
    }

}
