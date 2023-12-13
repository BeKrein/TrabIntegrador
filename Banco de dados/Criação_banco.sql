create table funcionario(email text,cargo text NOT NULL, nome text NOT NULL, usuario text primary key, senha text NOT NULL);
create table cliente(nome text NOT NULL, telefone text NOT NULL, email text, empresa text, cpf text primary key);
create table pedidos(valor numeric NOT NULL, datainicio date, idp serial primary key, cpf text, constraint pedidos_fk_cliente foreign key (cpf) references cliente(cpf));
create table produto(tipoprod text NOT NULL, tamanho text NOT NULL, idprod serial primary key,uso_de_tecido numeric NOT NULL, tipotec text NOT NULL);
create table tecido(idt text primary key, tipo text NOT NULL, cor text NOT NULL, peso numeric NOT NULL, fornecedor text NOT NULL);
create table logs(data timestamp, usuario text, mudança text,idl serial primary key);

create table ped_prod(idp integer, idprod integer,quantidade integer, cor text, primary key (idprod,idp,cor), constraint ped_prod_fk_pedido foreign key (idp) references pedidos(idp), constraint ped_prod_fk_produto foreign key(idprod) references produto(idprod));
create table ped_fun(usuario text,idp integer, primary key (usuario,idp), constraint ped_fun_fk_funcionario foreign key (usuario) references funcionario(usuario), constraint fun_ped_fk_pedido foreign key (idp) references pedidos(idp)); 
create table tec_usado(idp integer,idtecido text,quantidade numeric NOT NULL, primery key (idp,idtecido), constraint tec_usado_fk_pedidos foreign key (idp) references pedidos(idp));
create table tipodetecidos(tipodetecidos primary key);
