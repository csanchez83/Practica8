function listar()
{
    function onSuccess(contacts) 
    {
        for (i=0; i <= contacts.length; i++)
        {
            $('#contactos .plastic').html('<li><a href="tel:' + contacts[i].phoneNumbers[0] + '">' + contacts[i].name.formatted + '</a></li>');
        }
        
        
    
        //alert('Found ' + contacts.length + ' contacts.');
    };

    function onError(contactError) 
    {
        alert('onError!');
    };

    // find all contacts with 'Bob' in any name field
    var options      = new ContactFindOptions();
    //options.filter   = "c";
    //options.multiple = true;
    var fields       = ["*"];
    navigator.contacts.find(fields, onSuccess, onError, options);
    
    
}

function crear(nom, tel, mail)
{
    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() 
    {
        var myContact = navigator.contacts.create();
        myContact.displayName = nom;
        myContact.nickname = nom;
        
        var contacto = new ContactName();
        contacto.givenName = nom;
        contacto.familyName = "prueba";
        
        myContact.name = contacto;
        
        var telefonos = [];
        telefonos[0] = new ContactField("home", tel, true);
        telefonos[1] = new ContactField("mobile", "4881011014", false);
        myContact.phoneNumbers= telefonos;
        
        var correos = [];
        correos[0] = new ContactField("home", mail, true);
        myContact.emails = correos;
        
        myContact.save(function()
                       {
                           navigator.notification.alert("El contacto ha sido creado", null, "Contacto", "Aceptar");
                        }, 
                       function()
                       {
                            alert('No se pudo guardar el contacto');
                        }
                      );
    }
    
}

//Esta funcion se crea para cuando se hace clic en Crear
$(function()
  {
    $('#acSend').tap(function(){
        var nom = $('#nc .rounded input').eq(0).val(); //Devuelve el elemento con el indice 0
        var tel = $('#nc .rounded input').eq(1).val(); //Devuelve el elemento con el indice 0
        var mail = $('#nc .rounded input').eq(2).val(); //Devuelve el elemento con el indice 0
        
        crear(nom, tel, mail);
        //alert(nom+ tel+ mail);
        
    });
    
    $('#contactos .individual li').eq(0).tap(function() {
       listar(); 
       // alert();
    });
});