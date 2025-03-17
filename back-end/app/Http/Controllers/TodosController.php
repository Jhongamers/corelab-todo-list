<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       return Todo::orderBy('favorited','desc')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $todos = Todo::create($request->all());
        return response()->json($todos,201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $todo = Todo::findOrFail($id);  // Encontra um todo específico
        return response()->json($todo);  // Retorna o todo encontrado
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
       $todos = Todo::findOrFail($id);
       $todos->update($request->all());
       return response()->json($todos);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Todo::destroy($id);
        return response()->json(['message' => 'Todo deleted']);
    }

    public function toggleFavorite($id)
    {
        try {
            // Busca o registro pelo ID
            $todo = Todo::findOrFail($id);

            // Inverte o valor do campo 'favorited'
            $todo->favorited = !$todo->favorited;

            // Salva a alteração no banco de dados
            $todo->save();

            // Retorna o registro atualizado com uma mensagem de sucesso
            return response()->json([
                'message' => 'Status de favorito atualizado com sucesso.',
                'data' => $todo,
            ], 200);
        } catch (\Exception $e) {
            // Retorna uma mensagem de erro em caso de falha
            return response()->json([
                'message' => 'Erro ao atualizar o status de favorito.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
