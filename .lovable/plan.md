

## Diagnostico do Problema

O login funciona (confirmado nos logs do servidor: status 200), mas a aplicacao trava depois porque existe uma **condicao de corrida** (race condition) no codigo:

1. `signInWithPassword` e chamado e dispara o evento `onAuthStateChange`
2. O `onAuthStateChange` executa **antes** do codigo ter a chance de configurar o callback de resolucao (`adminCheckRef`)
3. O callback nunca e chamado, e o login fica preso por 5 segundos ate o timeout, que retorna `isAdmin: false`
4. Resultado: mensagem "Voce nao tem permissao de administrador" ou tela travada

## Solucao

Simplificar o `signIn` para **nao depender do `onAuthStateChange`**. Apos login bem-sucedido, chamar `checkAdmin` diretamente.

### Alteracoes

**Arquivo: `src/contexts/AuthContext.tsx`**

Reescrever a funcao `signIn` (linhas 80-97):

```typescript
const signIn = useCallback(async (email: string, password: string) => {
  const { error, data } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error, isAdmin: false };
  }
  // Check admin directly - don't rely on onAuthStateChange timing
  const adminResult = data.user ? await checkAdmin(data.user.id) : false;
  return { error: null, isAdmin: adminResult };
}, [checkAdmin]);
```

Remover o `adminCheckRef` (linha 21) e o codigo de coordenacao no `onAuthStateChange` (linhas 52-55), ja que nao sao mais necessarios.

**Arquivo: `src/pages/AdminLogin.tsx`**

Nenhuma alteracao necessaria - o componente ja esta correto para consumir o resultado de `signIn`.

### Por que isso resolve

- Elimina completamente a race condition
- O `checkAdmin` e chamado diretamente com o `user.id` retornado pelo `signInWithPassword`, sem depender de timing de eventos
- O `onAuthStateChange` continua funcionando para manter o estado global atualizado em background, mas o fluxo de login nao depende mais dele

