<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Multiforms extends Model
{
    use HasFactory;
    protected $fillable=[
       'company_id',
       'user_type',
       'form_type',
       'first_name',
       'last_name',
       'email',
       'contact',
       'address',
       'querry',
       'field_1',  //This are extra fields as per requirements
       'field_2',
       'field_3',
       'field_4',
       'field_5',
       'field_6',
       'field_7',
       'field_8',
       'field_9',
       'field_10',
       'created_at',
       'updated_at'
    ];
}
