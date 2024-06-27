<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $startDate = $request->query('startDate');
        $endDate = $request->query('endDate');
        if ($startDate?? false && $endDate?? false) {
            $query = Expense::whereBetween('expense_date', [$startDate, $endDate]);
            return $query->get();
        }
        return Expense::all(); 
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=> 'required',
            'expense_date'=> 'required',
            'price'=> 'required',
            'qty'=> 'required',
            'total_price'=> 'required',
            'show'=> 'required'
        ]);
        return Expense::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Expense::find($id); 
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name'=> 'required',
            'expense_date'=> 'required',
            'price'=> 'required',
            'qty'=> 'required',
            'total_price'=> 'required',
            'show'=> 'required'
        ]);

        $Expense = Expense::find($id);
        $Expense->update($request->all());
        return $Expense;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Expense::destroy($id);
    }
}
